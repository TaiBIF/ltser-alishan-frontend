// components
import CloseIcon from "../Icons/CloseIcon";

type FileItem = {
    id: number;
    file: File;
    result: string | ArrayBuffer | null;
    cover: boolean;
};

interface FileListItemProps {
    data: FileItem;
    index: number;
    handleFileRemove: (index: number) => void;
}

const FileListItem = (props: FileListItemProps) => {
    const { data, index, handleFileRemove } = props;
    const { result } = data;

    const isResultString = typeof result === "string";

    return isResultString ? (
        <>
            <li key={index} className="c-form__item">
                <div className="c-form__text c-form__text--overflow">
                    {result}
                </div>
                <button
                    type="button"
                    className="e-btn e-btn--icon"
                    onClick={() => {
                        handleFileRemove(index);
                    }}
                >
                    <CloseIcon />
                </button>
            </li>
        </>
    ) : null;
};

export default FileListItem;
