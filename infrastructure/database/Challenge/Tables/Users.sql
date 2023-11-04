CREATE TABLE [Challenge].[Users] (
    [Id]                  BIGINT            IDENTITY (1000, 1) NOT NULL,
    [Email]      VARCHAR (120)  NOT NULL,
    [Password]   VARCHAR(120)     NOT NULL,
    [Role]       VARCHAR(100)   NOT NULL,
    [CreatedOn]           DATETIME2 (0)  CONSTRAINT [DF_Users_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([Id] ASC)
);
