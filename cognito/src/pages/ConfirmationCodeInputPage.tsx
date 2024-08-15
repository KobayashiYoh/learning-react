import { useEffect, useRef } from "react";
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

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // フォーカスを最初のフィールドに当てる
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    handleCodeChange(event, index);

    // 1文字入力後に次のフィールドへフォーカスを移す
    if (event.target.value.length === 1 && index < 5) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0); // 微小な遅延を追加
    }
  };

  const Row = styled.div`
    display: flex;
  `;

  return (
    <Page>
      <Form>
        <Typography variant="h4" component="h2" gutterBottom>
          コードの確認
        </Typography>
        <FormTitle>確認コード（6桁）</FormTitle>
        <Row>
          {Array.from({ length: 6 }).map((_, index) => (
            <SingleDigitCodeField
              key={index}
              value={code[index]}
              onChange={(event) => handleChange(event, index)}
              index={index}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </Row>
        {error && <Typography color="error">{error}</Typography>}
        {isLoading && <CircularProgress />}
      </Form>
    </Page>
  );
};
