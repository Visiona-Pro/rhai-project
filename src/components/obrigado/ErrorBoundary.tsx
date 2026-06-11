import { Component, ErrorInfo, ReactNode } from "react";
import { CHECKOUT_URL } from "../../config/obrigado";

interface Props { children?: ReactNode; }
interface State { hasError: boolean; }

export default class ObrigadoErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("ObrigadoErrorBoundary:", error, errorInfo);
    }
    try {
      window.fbq?.("trackCustom", "AppCrash", { errorMessage: error?.message });
    } catch {}
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
              className="ob-btn-glitter-gold text-center !min-h-[50px] relative z-10 w-full no-underline"
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
