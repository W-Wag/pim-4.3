/*
  Warnings:

  - Added the required column `id` to the `Estado` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Estado] ADD [id] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Nota] ADD [frequencia] INT NOT NULL CONSTRAINT [Nota_frequencia_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
