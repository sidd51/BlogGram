import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="hzijm7crog5v74awi1jlgnc6kog1lqiw91yvjs4akhm8jffk"
            value={value}
            onEditorChange={onChange}
            init={{
            height: 500,
            menubar: true,

            plugins: [
              "lists", "link", "image", "media", "table",
              "wordcount", "autolink", "charmap"
            ],

            toolbar:
              "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | removeformat",

            setup: (editor) => {
              editor.on("init", () => {
                editor.execCommand("JustifyLeft");
              });
            },

            content_style: `
              body {
                font-family: Helvetica, Arial, sans-serif;
                font-size: 15px;
                line-height: 1.7;
                text-align: left !important;
                padding: 12px;
              }

              p { margin: 0 0 14px; }

              h1, h2, h3 {
                font-weight: bold;
                margin: 18px 0 10px;
              }

              ul, ol {
                margin-left: 20px;
              }

              li {
                margin-bottom: 6px;
              }
            `,
          }}

                    />
                  )}
                />
              </div>
            );
          }
