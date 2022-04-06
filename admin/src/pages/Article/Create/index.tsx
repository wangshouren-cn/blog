import React, { HTMLAttributes, useCallback } from 'react'
import { createArticle, isObject, isTrue, Message, SaveBar, useFormStore } from 'react-blog-library'
import { useNavigate } from 'react-router'

import ArticleForm from '../Components/ArticleForm'
export interface CreateArticleProps extends HTMLAttributes<any> { }
const CreateArticle: React.FC<CreateArticleProps> = () => {
  const [formStore] = useFormStore()

  const navigate = useNavigate();

  const handleSave = useCallback(async () => {
    const msgs = formStore.validateAll()

    if (!isTrue(msgs)) return Message.error((msgs as string[]).join('；'))

    const values = formStore.getValues();

    // console.log("values", values);


    if (isObject(values.content)) values.content = values.content.toHTML()

    await createArticle(formStore.getValues())

    navigate(-1);

  }, [])

  return (
    <>
      <ArticleForm form={formStore} />
      <SaveBar showBack onSave={handleSave} />
    </>
  )
}
export default CreateArticle
