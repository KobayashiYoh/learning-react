import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
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

export const Page: React.FC<PageProps> = (props: PageProps) => {
  const { children } = props;
  return (
    <StyledPage>
      <motion.div
        initial={{ opacity: 0, x: 100 }} // 初期状態: 左側にオフセットし、透明
        animate={{ opacity: 1, x: 0 }} // マウント時: 位置を元に戻し、不透明に
        exit={{ opacity: 0, x: -100 }} // アンマウント時: 右側にオフセットし、透明
      >
        {children}
      </motion.div>
    </StyledPage>
  );
};

export default StyledPage;
