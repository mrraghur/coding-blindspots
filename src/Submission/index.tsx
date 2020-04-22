import React, { useState, useContext } from 'react';
import { Tooltip, Button, Input, Modal, message } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Editor, EditorOptions, Language } from '../Editor';
import { store } from '../store';
import { Snippet } from '../types';
import styles from './styles.css';
import 'antd/es/button/style';
import 'antd/es/input/style';
import 'antd/es/modal/style';
import 'antd/es/message/style';
// @ts-ignore
import Infographic from '../assets/infographic.png';

interface SubmissionProps {
  history: {
    push: Function;
  };
}

const Submission = (props: SubmissionProps) => {
  const context = useContext(store);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState<Language>(Language.JAVASCRIPT);

  const handleSubmission = (payload: Snippet): void => {
    const { id, title, text } = payload;
    if (!title || !text) {
      if (!title && !text) {
        message.error('Snippet / Title must not be empty!');
        return;
      }
      if (!title) {
        message.error('Title must not be empty!');
      }
      if (!text) {
        message.error('Snippet must not be empty!');
      }
      return;
    }

    context.dispatch({
      type: 'SAVE_SNIPPET',
      payload,
    });
    Modal.success({
      title: 'Submission Success',
      content: (
        <p>
          Thank you for submitting your snippet. Your submission ID is {id}. To
          view your submission, click <a href={`/view#${id}`}>here.</a>
        </p>
      ),
    });
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Submit Question and Code
          <Tooltip
            title="
            In order for us to give you feedback on your code, please ensure that you submit the complete
            question along with your solution. Submissions with inadequate context will be ignored.
            "
          >
            <QuestionCircleTwoTone className={styles.tooltip} />
          </Tooltip>
        </h2>
        <div>
          <EditorOptions
            language={language}
            setLanguage={setLanguage}
            enabled
          />
          <div className={styles.editor}>
            <Editor
              text={text}
              language={language}
              onChange={(editor: any, data: any, value: string) => {
                setText(value);
              }}
              editable
            />
          </div>
          <div className={styles.submit}>
            <Input
              className={styles.title}
              onChange={(title) => setTitle(title.currentTarget.value)}
              placeholder="Snippet Title"
            />
            <Button
              type="primary"
              onClick={() =>
                handleSubmission({
                  id: String(new Date().getTime()),
                  title,
                  text: JSON.stringify(text),
                  language,
                  comments: [],
                })
              }
            >
              Submit Snippet
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.secondaryHeading}>Your Previous Submissions</p>
        <p>Please login to view previous submissions.</p>
        <Button type="primary">Login</Button>&nbsp;
        <Button type="default">Signup</Button>
      </div>
      <div className={styles.infographicContainer}>
        <img
          className={styles.infographic}
          src={Infographic}
          alt="CodingBlindspots infographic"
        />
      </div>
    </>
  );
};

export default Submission;
