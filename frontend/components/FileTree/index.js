import { useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'
import folder from '@/images/folder.png'
import file from '@/images/file.png'
import right from '@/images/right.png'
import down from '@/images/down.png'

const FILE_TYPE = {
    FILE: 'file',
    FOLDER: 'folder'
}

const Icon = ({ src, alt, className = '' }) => <Image className={`${styles.icon} ${className}`} src={src} width={30} height={30} alt={alt} />

function FileTree({ data }) {
    const { name, toggled, child } = data

    const [isToggled, setIsToggled] = useState(
        toggled || false
    )

    const toggle = () => setIsToggled(isToggled => !isToggled)

    const handleOnClick = () => {
        if (isFolder) toggle()
    }

    const type = name.includes('.') ? FILE_TYPE.FILE : FILE_TYPE.FOLDER
    const isFolder = type === FILE_TYPE.FOLDER

    const { folderIcon, filesIcon, container, dataContainer, childsContainer, childWrapper } = styles

    const arrowIcon = isToggled ? down : right

    const fileIcon = isFolder ? folder : file
    const fileClass = isFolder ? folderIcon : filesIcon

    return (
        <div className={container}>
            <div className={`${dataContainer} ${isFolder ? styles.folder : ''}`} onClick={handleOnClick}>
                {isFolder && <Icon src={arrowIcon} alt='arrow-icon' />}
                <Icon src={fileIcon} className={fileClass} alt='file-icon' />
                <h1>{name}</h1>
            </div>
            {isToggled && (
                <div className={childsContainer}>
                    {child.length > 0 && child.map(childData =>
                        <div className={childWrapper} key={childData.id}>
                            <FileTree data={childData} />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default FileTree