/*
  Warnings:

  - You are about to drop the column `estado` on the `Endereco` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ra]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cod_turma` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Aluno] ADD [cod_turma] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Endereco] DROP COLUMN [estado];

-- CreateIndex
ALTER TABLE [dbo].[Aluno] ADD CONSTRAINT [Aluno_ra_key] UNIQUE NONCLUSTERED ([ra]);

-- AddForeignKey
ALTER TABLE [dbo].[Aluno] ADD CONSTRAINT [Aluno_cod_turma_fkey] FOREIGN KEY ([cod_turma]) REFERENCES [dbo].[Turma]([cod]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
