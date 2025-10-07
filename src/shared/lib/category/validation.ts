import { z } from "zod";

const categoryParamsValidationSchema = z.object({
  categoryId: z.string().regex(/^\d+$/).optional(),
});

export const parseCategoryIdParams = (
  categoryId: string | undefined
): number | undefined => {
  const { success, data } = categoryParamsValidationSchema.safeParse({
    categoryId,
  });
  if (!success || !data.categoryId) return undefined;

  const id = Number(data.categoryId);
  return Number.isInteger(id) && id > 0 ? id : undefined;
};
