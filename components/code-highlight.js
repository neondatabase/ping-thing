import PropTypes from 'prop-types';
import { CodeBlock } from 'react-code-blocks';
import customTheme from '../utils/code-block-theme';

const CodeHighlight = ({ text }) => {
  return (
    <article className='overflow-auto overscroll-auto'>
      <pre className='not-prose m-0 p-3 bg-brand-code'>
        <CodeBlock
          text={text}
          language='js'
          showLineNumbers={true}
          theme={customTheme}
        />
      </pre>
    </article>
  );
};

CodeHighlight.propTypes = {
  /** the code snippet to display */
  text: PropTypes.string.isRequired,
};

export default CodeHighlight;
