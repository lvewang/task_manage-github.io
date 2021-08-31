import { useEffect } from "react";

export const useDocumentTitle = (title: string, keepOnUnmount?: boolean) => {
  const oldTitle = document.title;
  useEffect(() => {
    document.title = title;
  }, [title]);
  // useEffect(() => {
  //   if (!keepOnUnmount) {
  //     document.title = oldTitle;
  //   }
  // }, []);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
};
