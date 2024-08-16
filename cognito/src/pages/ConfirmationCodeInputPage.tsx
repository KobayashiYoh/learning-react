import { useEffect, useRef, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import { Page } from "../components/Page";
import { Form } from "../components/Form";
import { FormTitle } from "../components/FormTitle";
import { SingleDigitCodeField } from "../components/SingleDigitCodeField";
import styled from "styled-components";
import { useConfirmationCodeInputState } from "../hooks/useConfirmationCodeInputState";

export const ConfirmationCodeInputPage = () => {
  const username = "hoge@example.com";
  const { code, isLoading, error, handleCodeChange } =
    useConfirmationCodeInputState(username);

  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[currentIndex]) {
      inputRefs.current[currentIndex].focus();
    }
  }, [currentIndex]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    handleCodeChange(event, index);

    if (event.target.value.length === 1 && index < 5) {
      setCurrentIndex(index + 1);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "ArrowRight" && index < 5) {
      setCurrentIndex(index + 1);
    } else if (event.key === "ArrowLeft" && index > 0) {
      setCurrentIndex(index - 1);
    } else if (event.key === "Backspace" && index > 0) {
      setTimeout(() => {
        setCurrentIndex(index - 1);
      }, 0); // 微小な遅延を追加
    }
  };

  const Row = styled.div`
    display: flex;
    gap: 4px;
  `;

  const Title = styled.div`
    font-weight: bold;
    font-size: 24px;
  `;

  const TitleHeader = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 16px;
  `;

  return (
    <Page>
      <Form>
        <TitleHeader>
          <Title>コードの確認</Title>
          {isLoading && <CircularProgress size={32} />}
        </TitleHeader>
        <FormTitle>確認コード（6桁）</FormTitle>
        <Row>
          {Array.from({ length: 6 }).map((_, index) => (
            <SingleDigitCodeField
              key={index}
              value={code[index]}
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </Row>
        {error && <Typography color="error">{error}</Typography>}
      </Form>
    </Page>
  );
};
