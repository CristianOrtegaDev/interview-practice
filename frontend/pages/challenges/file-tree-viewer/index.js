// The "notion" representative image did not work, so I implemented my own version of a FileTree viewer

import styles from './index.module.css'
import FileTree from '@/components/FileTree'

const data = {
  name: "rootFolder",
  id: 1,
  toggled: true,
  child: [
    {
      name: "folder1",
      id: 2,
      child: [
        {
          name: "folder3",
          id: 3,
          child: [
            { name: "file3.js", id: 6, child: [] },
            { name: "file4.ts", id: 7, child: [] },
          ],
        },
        { name: "file1.js", id: 4, child: [] },
        { name: "file2.ts", id: 5, child: [] },
      ],
    },
    {
      name: "folder2",
      id: 8,
      child: [
        { name: "file5.py", id: 9, child: [] },
        { name: "file6.cpp", id: 10, child: [] },
      ],
    },
  ],
};

export default function FileTreeViewer() {

  return (
    <>
      <div className={styles.container}>
        <FileTree data={data} />
      </div>
    </>
  )
}
