CREATE TABLE [Challenge].[Operations] (
    [Id]                  BIGINT            IDENTITY (1000, 1) NOT NULL,
    [Type] [nvarchar](50) NOT NULL,
	  [Cost] [int] NOT NULL,
    [CreatedOn]           DATETIME2 (0)  CONSTRAINT [DF_Operation_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Operation] PRIMARY KEY CLUSTERED ([Id] ASC)
);
