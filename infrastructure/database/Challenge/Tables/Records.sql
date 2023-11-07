
CREATE TABLE [Challenge].[Records] (
    [Id]                  BIGINT            IDENTITY (1000, 1) NOT NULL,
    [OperationId]               BIGINT            NOT NULL,
    [UserId]          BIGINT            NULL, --null when is custom
    [Amount]               INT  NULL,
    [UserBalance]                INT  NOT NULL,
    [OperationResponse]              FLOAT  NOT NULL,
    [CreatedOn]           DATETIME2 (0)  CONSTRAINT [DF_Conditions_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Record] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Condition_Operations] FOREIGN KEY ([OperationId]) REFERENCES [Challenge].[Operations] ([Id]),
    CONSTRAINT [FK_Condition_Users] FOREIGN KEY ([UserId]) REFERENCES [Challenge].[Users] ([Id])
);