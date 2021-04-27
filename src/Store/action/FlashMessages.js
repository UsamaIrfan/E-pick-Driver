export const showSimpleMessage = (type = "default", props = {}) => {
    const message = {
        message: "Some message title",
        description: "Lorem ipsum dolar sit amet",
        icon: { icon: "auto", position: "left" },
        type,
        ...props,
    };

    showMessage(message);
}