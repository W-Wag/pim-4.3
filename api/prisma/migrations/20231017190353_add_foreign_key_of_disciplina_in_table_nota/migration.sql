/*
  Warnings:

  - Added the required column `cod_disciplina` to the `Nota` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Nota] ADD [cod_disciplina] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Nota] ADD CONSTRAINT [Nota_cod_disciplina_fkey] FOREIGN KEY ([cod_disciplina]) REFERENCES [dbo].[Disciplina]([cod_disciplina]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
