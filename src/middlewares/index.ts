const withMiddlewares = (handler, middlewares = []) => (event, context) => {
    const chainMiddlewares = (middlewares) => {
        const [firstMiddleware, ...restOfMiddlewares] = middlewares;
        if (firstMiddleware) {
            return (ev, ctx) => {
                try {
                    return firstMiddleware(ev, ctx, chainMiddlewares(restOfMiddlewares))
                } catch(error) {
                    return Promise.reject(error)
                }
            }
        }

        return handler;
    }

    return chainMiddlewares(middlewares)(event, context)
        .then(result => result)
        .catch(error => error)
}

export { withMiddlewares };
