import React, { useCallback, useEffect } from "react";
import { getAbout, updateAbout,upload } from "react-blog-library";
import { Form, FormItem, isTrue, Loading, Message, MultipartUpload, SaveBar, TagBox, TextArea, useFormStore, useHttpData} from "react-blog-library"
const FunctionComponent: React.FC = () => {
  /**
   * @description: states
   */
  const { data, loading, run, error } = useHttpData(getAbout);

  const [formStore] = useFormStore();

  /**
   * @description: functions
   */

  useEffect(() => {
    refresh();
  }, []);

  const refresh = useCallback(async () => {
    await run();
    formStore.setValues({ ...data });
  }, []);

  const handleSave = useCallback(async () => {
    const vld = formStore.validateAll();

    if (!isTrue(vld)) return Message.error((vld as string[]).join(";"));

    await updateAbout(data._id, formStore.getValues());
  }, []);

  /**
   * @description: conditions
   */
  if (error) {
    Message.error(error);
  }
  return (
    <>
      <Loading loading={loading}>
        {data && (
          <Form formStore={formStore}>
            <FormItem label="标签" field="tags">
              <TagBox difference showAdd />
            </FormItem>
            <FormItem label="简介" field="resume">
              <TextArea />
            </FormItem>
            <FormItem label="图片" field="imgs">
              <MultipartUpload max={3} transformer={upload} />
            </FormItem>
          </Form>
        )}
        <SaveBar onSave={handleSave} onRefresh={refresh} />
      </Loading>
    </>
  );
};
export default React.memo(FunctionComponent);
