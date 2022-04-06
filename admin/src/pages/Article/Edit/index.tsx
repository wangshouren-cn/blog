import {
  useCallback,
  useLayoutEffect,
  useMemo
} from 'react'
import {
  getArticleById,
  isObject,
  isTrue,
  isValidString,
  Loading,
  Message,
  SaveBar,
  updateArticle,
  useFormStore,
  useHttpData
} from 'react-blog-library'
import {
  useNavigate,
  useSearchParams
} from 'react-router-dom'
import ArticleForm from '../Components/ArticleForm'

const Edit = () => {
  const { data, run, loading, error } = useHttpData(async () => {
    if (isValidString(id)) return await getArticleById(id as string)
    else return Promise.reject('url路径中未获取到id参数')
  })

  const navigate = useNavigate();

  const [form] = useFormStore<{
    content: string;
    title: string;
    category: string;
    tags: string[];
    cover: ImgFile | null;
  }>()

  const [searchParams, _] = useSearchParams()

  const id = useMemo(() => searchParams.get('id'), [])

  const refresh = useCallback(() => {
    run().then((data) => {
      if (!data) return
      const values = {
        ...data
      }

      form.setValues(values)
    })
  }, [])

  useLayoutEffect(() => {
    refresh()
  }, [])

  const onSave = useCallback(async () => {
    if (!id) return Message.error('id不存在')

    const res = form.validateAll()

    if (!isTrue(res)) {
      return Message.error((res as string[]).join(';'))
    }

    const values = form.getValues()

    await updateArticle(id, values as any);

    navigate(-1);

  }, [form, id])

  if (!id) return

  if (error) Message.error(error)

  return (
    <Loading loading={loading}>
      <ArticleForm form={form} />
      <SaveBar
        onRefresh={refresh}
        lastSaveTime={data?.updateTime}
        showBack
        onSave={onSave}
      />
    </Loading>
  )
}

export default Edit
