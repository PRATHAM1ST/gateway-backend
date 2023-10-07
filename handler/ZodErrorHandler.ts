import { z } from "zod";

const validateData = (data: any, schema: z.ZodObject<any, any>) => {
    try {
        const validatedData = schema.parse(data);
        return validatedData;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw {
                message: "Validation failed",
                errors: error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            };
        } else {
            throw error;
        }
    }
};

export default validateData;
