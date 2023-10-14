BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Aluno] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cpf] NVARCHAR(1000) NOT NULL,
    [nome] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [data_nascimento] DATETIME2 NOT NULL,
    [rg] NVARCHAR(1000) NOT NULL,
    [telefone] NVARCHAR(1000) NOT NULL,
    [enderecoId] INT NOT NULL,
    CONSTRAINT [Aluno_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Aluno_cpf_key] UNIQUE NONCLUSTERED ([cpf]),
    CONSTRAINT [Aluno_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Endereco] (
    [id] INT NOT NULL IDENTITY(1,1),
    [logradouro] NVARCHAR(1000) NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    [complemento] NVARCHAR(1000),
    [cep] NVARCHAR(1000) NOT NULL,
    [cidade] NVARCHAR(1000) NOT NULL,
    [bairro] NVARCHAR(1000) NOT NULL,
    [alunoId] INT NOT NULL,
    CONSTRAINT [Endereco_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Endereco] ADD CONSTRAINT [Endereco_alunoId_fkey] FOREIGN KEY ([alunoId]) REFERENCES [dbo].[Aluno]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
