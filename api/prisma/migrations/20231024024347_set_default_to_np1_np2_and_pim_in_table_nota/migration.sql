BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Nota] ADD CONSTRAINT [Nota_np1_df] DEFAULT 0 FOR [np1], CONSTRAINT [Nota_np2_df] DEFAULT 0 FOR [np2], CONSTRAINT [Nota_pim_df] DEFAULT 0 FOR [pim];

-- AddForeignKey
ALTER TABLE [dbo].[Disciplina] ADD CONSTRAINT [Disciplina_cpf_professor_fkey] FOREIGN KEY ([cpf_professor]) REFERENCES [dbo].[Professor]([cpf]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Disciplina] ADD CONSTRAINT [Disciplina_cod_curso_fkey] FOREIGN KEY ([cod_curso]) REFERENCES [dbo].[Curso]([cod]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
