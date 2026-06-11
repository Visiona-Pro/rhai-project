export interface PainCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

export interface Phase {
  id: string;
  num: string;
  phaseName: string;
  title: string;
  description: string;
  mindset: string;
  impact: string;
}

export interface CourseBlock {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
}

export interface BeforeAfterItem {
  id: string;
  before: string;
  after: string;
}

export interface Testimonial {
  id: string;
  initial: string;
  name: string;
  text: string;
  date?: string;
}

export interface Objection {
  id: string;
  question: string;
  answer: string;
}

export interface OrderBump {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  cashPrice: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
