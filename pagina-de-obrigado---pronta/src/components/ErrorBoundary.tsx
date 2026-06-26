import { Component, ErrorInfo, ReactNode } from "react";
import { CHECKOUT_URL } from "../config";

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 1. Log para o console apenas em desenvolvimento
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // 2. Registro e telemetria de erros de produção
    try {
      const errorPayload = {
        message: error?.message || "Unknown error",
        stack: error?.stack || "",
        componentStack: errorInfo?.componentStack || "",
        url: typeof window !== "undefined" ? window.location.href : "unknown",
        time: new Date().toISOString(),
      };

      // Integração com GA4 (Google Analytics) e Meta Pixel se disponíveis
      if (typeof window !== "undefined") {
        window.gtag?.("event", "exception", {
          description: `${errorPayload.message} em ${errorPayload.componentStack.substring(0, 150)}`,
          fatal: true,
          error_stack: errorPayload.stack.substring(0, 500)
        });

        window.fbq?.("trackCustom", "AppCrash", {
          errorMessage: errorPayload.message,
          errorTime: errorPayload.time
        });
      }

      // Persistência local (fácil extração se um usuário reportar problema ao suporte)
      if (isLocalStorageAvailable()) {
        try {
          const errorLogs: unknown[] = JSON.parse(
            localStorage.getItem("production_app_errors") ?? "[]"
          );
          const logsArray = Array.isArray(errorLogs) ? errorLogs : [];
          logsArray.push(errorPayload);
          localStorage.setItem(
            "production_app_errors",
            JSON.stringify(logsArray.slice(-5))
          );
        } catch {
          // Silencioso: QuotaExceededError ou outro erro de storage não deve crashar o ErrorBoundary
        }
      }
    } catch (telemetryError) {
      if (import.meta.env.DEV) {
        console.warn("Falha ao registrar telemetria do erro:", telemetryError);
      }
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
          <div className="w-full max-w-[340px] text-center">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glitter-gold text-center !min-h-[50px] relative z-10 w-full no-underline"
              id="error-boundary-cta"
            >
              <span className="relative z-10 flex items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] font-bold !text-[13px] text-white">
                QUERO MEUS ENCONTROS
              </span>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
