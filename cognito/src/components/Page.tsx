import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  RoutingAnimationType,
  RoutingAnimationTypes,
} from "../types/routingAnimationType";
import { switchRoutingAnimation } from "../utils/switchRoutingAnimation";

interface PageProps {
  children: ReactNode;
  animationType?: RoutingAnimationType;
}

const StyledPage = styled.div`
  background-color: #ffffff;
  color: #333333;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Page: React.FC<PageProps> = ({
  children,
  animationType = RoutingAnimationTypes.None,
}: PageProps) => {
  const { initial, animate, exit } = switchRoutingAnimation(animationType);
  return (
    <StyledPage>
      <motion.div initial={initial} animate={animate} exit={exit}>
        {children}
      </motion.div>
    </StyledPage>
  );
};

export default StyledPage;
