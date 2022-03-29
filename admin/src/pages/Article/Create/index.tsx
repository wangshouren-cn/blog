import React, { HTMLAttributes, useCallback } from "react";
import { createArticle, isObject, isTrue, Message, SaveBar, useFormStore } from "react-blog-library";

import ArticleForm from "../Components/ArticleForm";
export interface CreateArticleProps extends HTMLAttributes<any> {}
const CreateArticle: React.FC<CreateArticleProps> = (props) => {
  const [formStore] = useFormStore();

  const handleSave = useCallback(async () => {
    const msgs = formStore.validateAll();

    if (!isTrue(msgs)) return Message.error((msgs as string[]).join("；"));

    console.log("formStore.getValues()", formStore.getValues());
    
    const values = formStore.getValues();
    
    if (isObject(values.content)) values.content = values.content.toHTML();

    await createArticle(formStore.getValues());
  }, []);

  

  return (
    <>
      <ArticleForm form={formStore} />
      <SaveBar showBack onSave={handleSave} />
    </>
  );
};
export default CreateArticle;
