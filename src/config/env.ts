const required = (key: keyof ImportMetaEnv): string => {
    const value = import.meta.env[key];
    if (!value) throw new Error(`Missing environment variable: ${key}`);
    return value.replace(/\/$/, "");
};

export const ENV = {
    apiBaseUrl: required("VITE_API_BASE_URL"),
};
