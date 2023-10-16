/*
  Warnings:

  - The primary key for the `Aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data_nascimento` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `alunoId` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `Endereco` table. All the data in the column will be lost.
  - Added the required column `dt_nascimento` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_endereco` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ra` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_cidade` to the `Endereco` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Endereco] DROP CONSTRAINT [Endereco_alunoId_fkey];

-- DropIndex
ALTER TABLE [dbo].[Aluno] DROP CONSTRAINT [Aluno_email_key];

-- AlterTable
ALTER TABLE [dbo].[Aluno] DROP CONSTRAINT [Aluno_pkey];
ALTER TABLE [dbo].[Aluno] DROP COLUMN [data_nascimento],
[id];
ALTER TABLE [dbo].[Aluno] ADD CONSTRAINT Aluno_pkey PRIMARY KEY CLUSTERED ([cpf]);
ALTER TABLE [dbo].[Aluno] ADD [dt_nascimento] DATETIME2 NOT NULL,
[genero] NVARCHAR(1000) NOT NULL,
[id_endereco] INT NOT NULL,
[ra] NVARCHAR(1000) NOT NULL,
[telefone2] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Endereco] DROP COLUMN [alunoId],
[cidade];
ALTER TABLE [dbo].[Endereco] ADD [id_cidade] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Professor] (
    [cpf] NVARCHAR(1000) NOT NULL,
    [nome] NVARCHAR(1000) NOT NULL,
    [dt_nascimento] DATETIME2 NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [ctps] NVARCHAR(1000) NOT NULL,
    [rg] NVARCHAR(1000) NOT NULL,
    [titularidade] NVARCHAR(1000) NOT NULL,
    [funcional] NVARCHAR(1000) NOT NULL,
    [telefone] NVARCHAR(1000) NOT NULL,
    [telefone2] NVARCHAR(1000),
    [id_endereco] INT NOT NULL,
    CONSTRAINT [Professor_pkey] PRIMARY KEY CLUSTERED ([cpf]),
    CONSTRAINT [Professor_cpf_key] UNIQUE NONCLUSTERED ([cpf])
);

-- CreateTable
CREATE TABLE [dbo].[Matricula] (
    [ra] NVARCHAR(1000) NOT NULL,
    [situacao] NVARCHAR(1000) NOT NULL,
    [data_Matricula] DATETIME2 NOT NULL CONSTRAINT [Matricula_data_Matricula_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Matricula_pkey] PRIMARY KEY CLUSTERED ([ra]),
    CONSTRAINT [Matricula_ra_key] UNIQUE NONCLUSTERED ([ra])
);

-- CreateTable
CREATE TABLE [dbo].[Turma] (
    [cod] NVARCHAR(1000) NOT NULL,
    [Quantidade_alunos] INT NOT NULL,
    [Curso_cod] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Turma_pkey] PRIMARY KEY CLUSTERED ([cod]),
    CONSTRAINT [Turma_cod_key] UNIQUE NONCLUSTERED ([cod])
);

-- CreateTable
CREATE TABLE [dbo].[Curso] (
    [cod] NVARCHAR(1000) NOT NULL,
    [nome] NVARCHAR(1000) NOT NULL,
    [carga_horaria] INT NOT NULL,
    CONSTRAINT [Curso_pkey] PRIMARY KEY CLUSTERED ([cod]),
    CONSTRAINT [Curso_cod_key] UNIQUE NONCLUSTERED ([cod])
);

-- CreateTable
CREATE TABLE [dbo].[Disciplina] (
    [cod_disciplina] INT NOT NULL,
    [nome] NVARCHAR(1000) NOT NULL,
    [carga_horaria] INT NOT NULL,
    [cpf_professor] NVARCHAR(1000) NOT NULL,
    [cod_curso] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Disciplina_pkey] PRIMARY KEY CLUSTERED ([cod_disciplina]),
    CONSTRAINT [Disciplina_cod_disciplina_key] UNIQUE NONCLUSTERED ([cod_disciplina])
);

-- CreateTable
CREATE TABLE [dbo].[Nota] (
    [id] INT NOT NULL IDENTITY(1,1),
    [np1] DECIMAL(32,16) NOT NULL,
    [np2] DECIMAL(32,16) NOT NULL,
    [pim] DECIMAL(32,16) NOT NULL,
    [Semestre] INT NOT NULL,
    [cpf_aluno] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Nota_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Cidade] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [uf_estado] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Cidade_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Estado] (
    [uf] NVARCHAR(1000) NOT NULL,
    [nome] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Estado_pkey] PRIMARY KEY CLUSTERED ([uf])
);

-- AddForeignKey
ALTER TABLE [dbo].[Aluno] ADD CONSTRAINT [Aluno_id_endereco_fkey] FOREIGN KEY ([id_endereco]) REFERENCES [dbo].[Endereco]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Aluno] ADD CONSTRAINT [Aluno_ra_fkey] FOREIGN KEY ([ra]) REFERENCES [dbo].[Matricula]([ra]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Professor] ADD CONSTRAINT [Professor_id_endereco_fkey] FOREIGN KEY ([id_endereco]) REFERENCES [dbo].[Endereco]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Turma] ADD CONSTRAINT [Turma_Curso_cod_fkey] FOREIGN KEY ([Curso_cod]) REFERENCES [dbo].[Curso]([cod]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Disciplina] ADD CONSTRAINT [Disciplina_cpf_professor_fkey] FOREIGN KEY ([cpf_professor]) REFERENCES [dbo].[Professor]([cpf]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Disciplina] ADD CONSTRAINT [Disciplina_cod_curso_fkey] FOREIGN KEY ([cod_curso]) REFERENCES [dbo].[Curso]([cod]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Nota] ADD CONSTRAINT [Nota_cpf_aluno_fkey] FOREIGN KEY ([cpf_aluno]) REFERENCES [dbo].[Aluno]([cpf]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Endereco] ADD CONSTRAINT [Endereco_id_cidade_fkey] FOREIGN KEY ([id_cidade]) REFERENCES [dbo].[Cidade]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cidade] ADD CONSTRAINT [Cidade_uf_estado_fkey] FOREIGN KEY ([uf_estado]) REFERENCES [dbo].[Estado]([uf]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
