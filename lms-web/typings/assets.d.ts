declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  import { ElementType, SVGProps } from "react";

  const ReactComponent: ElementType<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.woff2" {
  const path: string;
  export default path;
}
