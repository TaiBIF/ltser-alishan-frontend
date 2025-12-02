// components
import CloseIcon from "../Icons/CloseIcon";

type FileItem = {
    id: number;
    file: File;
    result: string | ArrayBuffer | null;
    cover: boolean;
};

interface FileImgItemProps {
    files: FileItem[];
    data: FileItem;
    index: number;
    handleFileRemove: (index: number) => void;
}

const FileImageItem = (props: FileImgItemProps) => {
    const { files, data, index, handleFileRemove } = props;
    const { file, result } = data;

    const isResultString = typeof result === "string";
    const fileLastModifiedTime = new Date(file.lastModified).toString();
    const isLastFile = files.length === 1;

    return isResultString ? (
        <>
            <label
                key={index}
                htmlFor={`cover${index}`}
                className="c-form__img"
            >
                <div className="d-flex">
                    <div className="c-form__thumbnail">
                        <img
                            src={result}
                            alt="img"
                            className="e-img e-img--contain"
                        />
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-start">
                        <div className="c-form__text c-form__text--title">
                            {file.name}
                        </div>
                        <div className="c-form__text">
                            大小: {file.size / 1000} KB
                        </div>
                        <div className="c-form__text">
                            最後修改: {fileLastModifiedTime}
                        </div>
                    </div>
                </div>
                {!isLastFile && (
                    <button
                        type="button"
                        className="e-btn e-btn--icon"
                        onClick={() => {
                            handleFileRemove(index);
                        }}
                    >
                        <CloseIcon />
                    </button>
                )}
            </label>
        </>
    ) : null;
};

export default FileImageItem;
