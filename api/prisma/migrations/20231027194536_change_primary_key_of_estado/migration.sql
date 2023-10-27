/*
  Warnings:

  - You are about to drop the column `uf_estado` on the `Cidade` table. All the data in the column will be lost.
  - The primary key for the `Estado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id_estado` to the `Cidade` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Cidade] DROP CONSTRAINT [Cidade_uf_estado_fkey];

-- AlterTable
ALTER TABLE [dbo].[Cidade] DROP COLUMN [uf_estado];
ALTER TABLE [dbo].[Cidade] ADD [id_estado] INT NOT NULL;

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'Estado'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_Estado] (
    [uf] NVARCHAR(1000) NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Estado_pkey] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_Estado] ON;
IF EXISTS(SELECT * FROM [dbo].[Estado])
    EXEC('INSERT INTO [dbo].[_prisma_new_Estado] ([id],[nome],[uf]) SELECT [id],[nome],[uf] FROM [dbo].[Estado] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_Estado] OFF;
DROP TABLE [dbo].[Estado];
EXEC SP_RENAME N'dbo._prisma_new_Estado', N'Estado';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[Cidade] ADD CONSTRAINT [Cidade_id_estado_fkey] FOREIGN KEY ([id_estado]) REFERENCES [dbo].[Estado]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
