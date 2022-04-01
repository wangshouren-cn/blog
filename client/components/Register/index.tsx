import React, { useCallback, useState } from "react";

import styles from "./index.module.css";
import {
  Button,
  ButtonWithInput,
  Form,
  FormItem,
  Input,
  isTrue,
  Message,
  useFormStore,
} from "react-blog-library";
import { sendCode } from "../../api/common";
import { useForceUpdate } from "react-blog-library/lib";
import { register } from "../../api";

interface RegisterProps extends React.HTMLAttributes<any> {
  onRegistered: (token: string, user: User) => any;
}

const FunctionComponent: React.FC<RegisterProps> = ({ onRegistered }) => {
  const [formStore] = useFormStore();

  const forceUpdate = useForceUpdate();

  const [sendState, _] = useState({
    disabled: false,
    timer: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const msgs = formStore.validateAll();

    if (isTrue(msgs)) {
      setLoading(true);

      const res = await register(formStore.getValues());

      if (res) {
        const { token, ...user } = res;
        onRegistered(token, user);
      }

      // for (let now = Date.now(); now + 3000 > Date.now(); );

      setLoading(false);
    } else {
      Message.error((msgs as string[]).join("；"));
    }
  };

  const send = useCallback(async (email: string) => {
    if (sendState.disabled) return;

    if (!isTrue(formStore.validate("email"))) {
      return Message.error("邮箱好像不正确");
    } else {

       await sendCode({ email: formStore.getValue("email") });
      sendState.timer = 5;
      await sendCode({ email: formStore.getValue("email") });
      sendState.disabled = true;
      forceUpdate();

      const timer = setInterval(() => {
        if (sendState.timer === 0) {
          clearInterval(timer);
          sendState.disabled = false;
        } else sendState.timer--;

        forceUpdate();
      }, 1000);
    }
  }, []);

  return (
    <Form formStore={formStore} className={styles["register"]}>
      <h2 className={styles["title"]}>Register</h2>
      <FormItem
        // defaultValue={"132"}
        rules={[
          {
            required: true,
            reg: /([a-z0-9]){6,10}/i,
            msg: "用户名是只包含a-z、0-9的任意组合，且长度为6~18位",
          },
        ]}
        className={styles["form-item"]}
        label="Username"
        field="username"
      >
        <Input />
      </FormItem>
      <FormItem
        // defaultValue={"132"}
        className={styles["form-item"]}
        label="Password"
        field="password"
        rules={[
          {
            required: true,
          },
          {
            required: true,
            reg: /([a-z0-9]){6,10}/i,
            msg: "密码是只包含a-z、0-9的任意组合，且长度为6~18位",
          },
        ]}
      >
        <Input type="password" />
      </FormItem>

      <div className={styles.emailBox}>
        <FormItem
          // defaultValue={"132"}
          className={styles["form-item"]}
          label="Email"
          field="email"
          rules={[
            {
              required: true,
              reg: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i,
              msg: "邮箱好像不规范",
            },
          ]}
        >
          <ButtonWithInput
            disabled={sendState.disabled}
            buttonPos="right"
            // @ts-ignore
            onButtonClick={send}
          >
            {sendState.disabled ? sendState.timer : "发送"}
          </ButtonWithInput>
        </FormItem>

        {/* <Button>发送</Button> */}
      </div>

      <FormItem
        // defaultValue={"132"}
        className={styles["form-item"]}
        label="验证码"
        field="code"
        rules={[
          {
            required: true,
            reg: /^[0-9]{4}$/i,
            msg: "验证码是4位数字",
          },
        ]}
      >
        <Input />
      </FormItem>

      <div style={{ textAlign: "center" }}>
        <Button
          disabled={loading}
          type="success"
          className={styles["button"]}
          onClick={handleClick}
        >
          {loading ? "请稍等..." : "register"}
        </Button>
      </div>
    </Form>
  );
};
export default React.memo(FunctionComponent);
