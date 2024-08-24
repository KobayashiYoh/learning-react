import {
  RoutingAnimationType,
  RoutingAnimationTypes,
} from "../types/routingAnimationType";

export function switchRoutingAnimation(animationType: RoutingAnimationType) {
  let initial, animate, exit;

  switch (animationType) {
    case RoutingAnimationTypes.SlideIn:
      initial = { opacity: 0, x: 100 };
      animate = { opacity: 1, x: 0 };
      exit = { opacity: 0, x: -100 };
      break;
    case RoutingAnimationTypes.FadeIn:
      initial = { opacity: 0 };
      animate = { opacity: 1 };
      exit = { opacity: 0 };
      break;
    case RoutingAnimationTypes.None:
    default:
      initial = {};
      animate = {};
      exit = {};
  }

  return { initial, animate, exit };
}
