BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Nota] DROP CONSTRAINT [Nota_cod_disciplina_fkey];

-- RedefineTables
BEGIN TRANSACTION;
ALTER TABLE [dbo].[Disciplina] DROP CONSTRAINT [Disciplina_cod_disciplina_key];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'Disciplina'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_Disciplina] (
    [cod_disciplina] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [carga_horaria] INT NOT NULL,
    [cpf_professor] NVARCHAR(1000),
    [cod_curso] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Disciplina_pkey] PRIMARY KEY CLUSTERED ([cod_disciplina])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_Disciplina] ON;
IF EXISTS(SELECT * FROM [dbo].[Disciplina])
    EXEC('INSERT INTO [dbo].[_prisma_new_Disciplina] ([carga_horaria],[cod_curso],[cod_disciplina],[cpf_professor],[nome]) SELECT [carga_horaria],[cod_curso],[cod_disciplina],[cpf_professor],[nome] FROM [dbo].[Disciplina] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_Disciplina] OFF;
DROP TABLE [dbo].[Disciplina];
EXEC SP_RENAME N'dbo._prisma_new_Disciplina', N'Disciplina';
COMMIT;

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
