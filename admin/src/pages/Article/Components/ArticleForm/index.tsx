import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import  {
  HTMLAttributes,
  useCallback,
} from "react";
import { FormStore,Message, Modal, TagBox, Form, FormItem, Input, Button, SingleUpload, getCategoryList, getTagList, upload } from "react-blog-library";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

interface EditFormProps extends HTMLAttributes<any> {
  form: FormStore;
}

const EditForm = ({ form }: EditFormProps) => {
  const editTag = useCallback(async () => {
    const { list } = await getTagList();

    const allTags = list.map((t) => t.name);

    if (allTags.length === 0) {
      return Message.error("还没有标签");
    }

    let activeTags: string[] = [];

    Modal.confirm({
      content: (
        <TagBox
          value={allTags}
          onActiveChange={(tags:string[]) => {
            activeTags = tags;
          }}
          defaultActiveState={form.getValue("tags")}
        />
      ),
      onCancel() {},
      onOk() {
        form.setValues({
          tags: activeTags,
        });
      },
    });
  }, []);

  const editCategory = useCallback(async () => {
    const { list } = await getCategoryList();

    const allCategory = list.map((c) => c.name);

    if (allCategory.length === 0) return Message.error("还没有分类");

    let category: string | null;

    let lastCategory = form.getValue("category");

    Modal.confirm({
      content: (
        <TagBox
          defaultActiveState={lastCategory ? [lastCategory] : []}
          beforeActiveChange={(_:any, tag:any, toActive:boolean) => {
            if (toActive) {
              category = tag;
              return [tag];
            }

            category = null;
            return [];
          }}
          value={allCategory}
          showAdd={false}
        />
      ),
      onOk() {
        if (category) form.setValue("category", category);
        else {
          form.setValue("category", null);
        }
      },
    });
  }, []);

  return (
    <Form formStore={form}>
      <FormItem rules={[{ required: true }]} label="文章标题" field="title">
        <Input />
      </FormItem>
      <FormItem label="文章内容" field="content">
        <BraftEditor
          id="editor-with-code-highlighter"
          style={{ width: "90%" }}
        />
      </FormItem>

      <FormItem label="分类" field="category">
        <>
          <TagBox
            value={form.getValue("category") ? [form.getValue("category")] : []}
          />
          <Button onClick={editCategory}>编辑</Button>
        </>
      </FormItem>

      <FormItem label="标签" field="tags">
        <>
          <TagBox value={form.getValue("tags") || []} />
          <Button onClick={editTag}>编辑</Button>
        </>
      </FormItem>
      <FormItem label="封面" field="cover">
        <SingleUpload transformer={upload} />
      </FormItem>
    </Form>
  );
};

export default EditForm;
