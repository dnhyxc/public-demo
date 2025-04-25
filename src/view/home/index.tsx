import { useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';

const Home = () => {
  const [status, setStatus] = useState<boolean>(true);

  const onClick = () => {
    setStatus(!status);
  };

  return (
    <div className={styles.container}>
      <h1>hello dnhyxc!!!</h1>

      {status ? (
        <h3>你好！我有一个帽衫，向左向右向前看～～～</h3>
      ) : (
        <h3>
          风，是大自然的精灵，时而温柔地抚过脸庞，时而狂野地舞动树梢。它带着远方的故事，穿梭在城市的街道，掠过寂静的山谷，抚慰着每一个孤独的灵魂。
        </h3>
      )}

      <Button type="primary" onClick={onClick}>
        test
      </Button>
    </div>
  );
};

export default Home;
