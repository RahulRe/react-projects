import styles from './primaryContainer.module.css'

export default function Container({children}){
    return (
        <div className={styles.primaryContainer}>
            {children}

        </div>
    )
}