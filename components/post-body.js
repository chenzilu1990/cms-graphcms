import postStyles from "./post-styles.module.css";

export default function PostBody({ content }) {
  return (
    <div style={{

        alignItems: 'center',

      }}>
      {content.map((post) => (
        <p>{post}</p>
      ))}
    </div>
  );
}
