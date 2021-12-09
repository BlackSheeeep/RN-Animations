import FadeAnimationComponent from "./FadeInorOut";
import RotateAnimationComponent from "./Rotation";
import TranslateAnimationComponent from "./Translation";
import DraggbleAnimation from './DraggbleAnimation';
import Scale from './Scale';
import Drawer from './Drawer';
export const FadeAnimation = FadeAnimationComponent;
export const RotateAnimation = RotateAnimationComponent;
export const TransAnimation = TranslateAnimationComponent;
export const DragAnimation = DraggbleAnimation;
export const ScaleAnimation = Scale;
export const DrawerAnimation = Drawer;
export default {
  RotateAnimation,
  FadeAnimation,
  TransAnimation,
  DragAnimation,
  ScaleAnimation,
  DrawerAnimation
};
