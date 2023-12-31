import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useSession } from "next-auth/react";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { data: sessionData } = useSession();

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note title"
            className="input input-primary input-lg w-full p-2 font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <CodeMirror
          value={code}
          width="100%"
          height="50vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="border border-gray-300"
        />
      </div>
      <div className="card-actions justify-end">
        {sessionData?.user ? (
          <button
            onClick={() => {
              onSave({
                title,
                content: code,
              });
              setCode("");
              setTitle("");
            }}
            className="btn btn-primary mt-2 md:mt-0"
            disabled={title.trim().length === 0 || code.trim().length === 0}
          >
            Save
          </button>
        ) : (
          <h1 className="m-4 rounded-lg p-4 text-2xl text-red-500">
            Login First To save Note
          </h1>
        )}
      </div>
    </div>
  );
};
