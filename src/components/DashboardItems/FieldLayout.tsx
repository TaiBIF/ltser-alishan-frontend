import React, { useState, useEffect } from "react";

import { Field, ErrorMessage, useFormikContext } from "formik";

// components
import FileImageItem from "./FileImageItem";
import FileListItem from "./FileListIem";

type TypeItem = {
    [key: string]: any;
    id?: number | string;
    title: string;
    colorClass?: string;
};

type AttachmentItem = {
    id: number;
    type: string;
    title?: string;
    content?: string;
};

type RelateTypes = TypeItem | AttachmentItem | any;

type FieldItem = {
    id: string | number;
    type: string;
    title: string;
    label: string;
    options?: RelateTypes[];
    readonly?: boolean;
    required?: boolean;
    hints?: RelateTypes[];
    multiple?: boolean;
    cover?: number | string;
    fileType?: string;
};

interface FileItem {
    id: number;
    file: File;
    result: string | ArrayBuffer | null;
    cover: boolean;
}

type ImagesItem = {
    image: string;
};

const FieldLayout = ({ data }: { data: FieldItem }) => {
    const {
        id,
        type,
        title,
        label,
        readonly,
        required,
        hints,
        options,
        multiple,
        fileType,
    } = data;
    const { values, setFieldValue } = useFormikContext<ItemTypes>();
    const [files, setFiles] = useState<FileItem[]>([]);
    const [fileName, setFileName] = useState("");
    const IMAGE_URL = "127.0.0.1:8000";

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFile = e.currentTarget.files?.[0];
    //     setFileName(e.currentTarget.name);

    //     e.target.value = "";

    //     if (selectedFile) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             const result =
    //                 typeof reader.result === "string" ? reader.result : "";
    //             setFiles((prev) => [
    //                 ...prev,
    //                 {
    //                     id: Date.now(),
    //                     file: selectedFile,
    //                     result,
    //                     cover: false,
    //                     order: prev.length,
    //                 },
    //             ]);
    //         };
    //         reader.readAsDataURL(selectedFile);
    //     }
    // };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name; // e.g. "images"
        const picked = Array.from(e.currentTarget.files || []); // FileList -> File[]

        // 清掉 input 的值，避免選相同檔案時 onChange 不觸發
        e.currentTarget.value = "";

        if (picked.length === 0) return;

        // 1) 更新 Formik 的值：永遠存成陣列（保留既有值 + 新增 File）
        const prev = (values as any)[name];
        const prevArr = Array.isArray(prev) ? prev : prev ? [prev] : [];
        const nextArr = [...prevArr, ...picked];
        setFieldValue(name, nextArr);

        // 2) 若你有本地預覽 files 狀態，也同步加入（可用 URL.createObjectURL 更快）
        setFiles((prevFiles) => [
            ...prevFiles,
            ...picked.map((file, i) => ({
                id: Date.now() + i,
                file,
                // 用 URL.createObjectURL 比 FileReader 快且不佔記憶體
                result: URL.createObjectURL(file),
                cover: false,
                order: prevFiles.length + i,
            })),
        ]);
    };

    const handleFileRemove = (index: number) => {
        setFiles((prevState) => prevState.filter((_, i) => i !== index));
    };

    const renderRequiredText = () => {
        return required && <span className="text-danger">*</span>;
    };

    const hasImageProperty = (obj: any): obj is { image: any[] } =>
        "image" in obj;

    useEffect(() => {
        if (fileName) {
            setFieldValue(
                fileName,
                files.length === 1 ? files[0].file : files.map((v) => v.file)
            );
        }
    }, [files]);

    switch (type) {
        case "text":
        case "email":
        case "date":
            return (
                <div className="c-form__set">
                    <label htmlFor={title} className="c-form__label">
                        {label}
                        {renderRequiredText()}
                    </label>
                    <Field
                        type={type}
                        id={title}
                        name={title}
                        className="c-form__input"
                        placeholder={`請輸入${label}`}
                        readOnly={readonly}
                        required={required}
                    />
                    <ErrorMessage
                        name={title}
                        component="small"
                        className="text-danger"
                    />
                </div>
            );
        case "select":
            return (
                <div className="c-form__set">
                    <label htmlFor={title} className="c-form__label">
                        {label}
                        {renderRequiredText()}
                    </label>
                    <Field
                        as="select"
                        id={title}
                        name={title}
                        className="c-form__input"
                        readOnly={readonly}
                        required={required}
                        multiple={multiple}
                    >
                        <option value={0} disabled>
                            請選擇{label}
                        </option>
                        {options?.map((v) => {
                            const { id, title, name } = v;
                            return (
                                <option key={`${id}-${v.id}`} value={id}>
                                    {title ? title : name}
                                </option>
                            );
                        })}
                    </Field>
                    <ErrorMessage
                        name={title}
                        component="small"
                        className="text-danger"
                    />
                </div>
            );
        case "file":
            return (
                <>
                    <div className="c-form__set">
                        <label htmlFor={title} className="c-form__label">
                            {label}
                            {renderRequiredText()}
                        </label>
                        <label htmlFor={title} className="c-form__file">
                            <span>
                                {files.length === 0
                                    ? "選擇檔案"
                                    : "繼續加入檔案"}
                            </span>
                        </label>
                        <input
                            type="file"
                            id={title}
                            name={title}
                            className="d-none"
                            onChange={handleFileChange}
                            accept={`${fileType}/*`}
                            multiple={multiple}
                        />
                        {hints &&
                            hints.map((v) => {
                                const { id, title } = v;
                                let value;
                                switch (id) {
                                    case "link":
                                        return (
                                            files.length !== 0 ||
                                            (hasImageProperty(values) &&
                                                typeof values.image ===
                                                    "string" && (
                                                    <div
                                                        key={id}
                                                        className="c-form__text"
                                                    >
                                                        {title}
                                                        {hasImageProperty(
                                                            values
                                                        ) &&
                                                            typeof values.image ===
                                                                "string" && (
                                                                <a
                                                                    // href={`${IMAGE_URL}/${values.image}`}
                                                                    href={`${values.image}`}
                                                                    className="e-link"
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    {
                                                                        values.image
                                                                    }
                                                                </a>
                                                            )}
                                                    </div>
                                                ))
                                        );
                                    case "file":
                                        return (
                                            typeof values.file === "string" && (
                                                <div
                                                    key={id}
                                                    className="c-form__text"
                                                >
                                                    {title}
                                                    <a
                                                        href={`${IMAGE_URL}/${values.file}`}
                                                        className="e-link"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        {values.file}
                                                    </a>
                                                </div>
                                            )
                                        );
                                    case "cover":
                                        value = (values as NewsItem).cover;
                                        const hasCover =
                                            (values as NewsItem).cover
                                                ?.length !== 0 &&
                                            typeof value === "string";
                                        return (
                                            hasCover && (
                                                <div
                                                    key={id}
                                                    className="c-form__text"
                                                >
                                                    {title}
                                                    <a
                                                        href={`${IMAGE_URL}/${value}`}
                                                        className="e-link"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        {value}
                                                    </a>
                                                </div>
                                            )
                                        );
                                    case "files":
                                        value = (
                                            (values as FormLinkItem) ||
                                            (values as NewsItem)
                                        ).attachments;
                                        const hasAttachments =
                                            (
                                                (values as FormLinkItem) ||
                                                (values as NewsItem)
                                            ).attachments?.length !== 0;
                                        return (
                                            hasAttachments && (
                                                <div
                                                    key={id}
                                                    className="c-form__text"
                                                >
                                                    {title}
                                                    {value &&
                                                        value.map(
                                                            (
                                                                v: AttachmentsItem,
                                                                i: number
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className="c-form__text"
                                                                    >
                                                                        {v.file}
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            )
                                        );
                                    case "images":
                                        value = (values as any).images;
                                        const hasImages =
                                            (values as any).images?.length !==
                                            0;
                                        return (
                                            hasImages && (
                                                <div
                                                    key={id}
                                                    className="c-form__text"
                                                >
                                                    {title}
                                                    {value &&
                                                        value.map(
                                                            (
                                                                v: ImagesItem,
                                                                i: number
                                                            ) => {
                                                                return (
                                                                    // <div
                                                                    //     key={i}
                                                                    //     className="c-form__text"
                                                                    // >
                                                                    //     {
                                                                    //         v.image
                                                                    //     }
                                                                    // </div>
                                                                    <a
                                                                        // href={`${IMAGE_URL}/${values.image}`}
                                                                        key={i}
                                                                        href={`${v.image}`}
                                                                        className="e-link"
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                    >
                                                                        {
                                                                            v.image
                                                                        }
                                                                    </a>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            )
                                        );
                                        const raw = (values as any)[id]; // e.g. values.images
                                        const list: any[] = Array.isArray(raw)
                                            ? raw
                                            : raw
                                            ? [raw]
                                            : []; // ✅ 保證是陣列

                                        list.map((v, i) => {
                                            const isFile = v instanceof File;
                                            const url =
                                                typeof v === "string"
                                                    ? v
                                                    : v?.image || null;
                                            return isFile ? (
                                                <span key={i}>{v.name}</span>
                                            ) : url ? (
                                                <a
                                                    key={i}
                                                    href={url}
                                                    className="e-link"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {url}
                                                </a>
                                            ) : (
                                                <span key={i}>-</span>
                                            );
                                        });
                                }
                            })}
                    </div>
                    {files &&
                        (fileType === "image" ? (
                            files.map((v, i) => {
                                return (
                                    <FileImageItem
                                        key={v.id}
                                        files={files}
                                        data={v}
                                        index={i}
                                        handleFileRemove={handleFileRemove}
                                    />
                                );
                            })
                        ) : (
                            <ul className="list-unstyled">
                                {files.map((v, i) => {
                                    return (
                                        <FileListItem
                                            key={v.id}
                                            data={v}
                                            index={i}
                                            handleFileRemove={handleFileRemove}
                                        />
                                    );
                                })}
                            </ul>
                        ))}
                </>
            );
        case "textarea":
            return (
                <div className="c-form__set">
                    <label htmlFor={title} className="c-form__label">
                        {label}
                        {renderRequiredText()}
                    </label>
                    <Field
                        as={type}
                        id={title}
                        name={title}
                        className="c-form__input"
                        placeholder={`請輸入${label}`}
                        readOnly={readonly}
                        required={required}
                        rows="10"
                    />
                    <ErrorMessage
                        name={title}
                        component="small"
                        className="text-danger"
                    />
                </div>
            );
        case "checkbox":
            return (
                <>
                    <div className="c-form__checkbox c-form__set">
                        <div className="c-form__label">
                            {label}
                            {renderRequiredText()}
                        </div>
                        <div className="c-form__checkbox-set">
                            {options?.map((v) => {
                                const { title } = v;
                                return (
                                    <div
                                        key={`${id}-${v.id}`}
                                        className="c-checkbox form-check"
                                    >
                                        <label
                                            className="c-checkbox__label form-check-label"
                                            htmlFor={title}
                                        >
                                            <Field
                                                type="checkbox"
                                                id={title}
                                                name={data.title}
                                                value={String(v.id)}
                                                className="c-checkbox__input form-check-input"
                                            />
                                            {title}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        <ErrorMessage
                            name={title}
                            component="small"
                            className="text-danger"
                        />
                    </div>
                </>
            );
        default:
            return <></>;
    }
};

export default FieldLayout;
