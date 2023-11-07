
CREATE TABLE [Challenge].[Balances] (
    [Id]                  BIGINT            IDENTITY (1000, 1) NOT NULL,
   
    [UserId]          BIGINT            NULL, --null when is custom
    [Amount]               INT  NULL,
   
    [CreatedOn]           DATETIME2 (0)  CONSTRAINT [DF_Conditions_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Balance] PRIMARY KEY CLUSTERED ([Id] ASC),
  
    CONSTRAINT [FK_Condition_Users] FOREIGN KEY ([UserId]) REFERENCES [Challenge].[Users] ([Id])
);