import styles from "./NoData.module.css";

function NoData({dataType}) {
  return (
    <div className={styles.main}>
      <h1>?</h1>
      <p >...Não tem {dataType} :/ </p>
    </div>
  );
}

export default NoData;
