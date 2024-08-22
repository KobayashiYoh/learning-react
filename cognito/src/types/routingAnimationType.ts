export const RoutingAnimationTypes = {
  None: "None",
  SlideIn: "SlideIn",
  FadeIn: "FadeIn",
} as const;

export type RoutingAnimationType =
  (typeof RoutingAnimationTypes)[keyof typeof RoutingAnimationTypes];
