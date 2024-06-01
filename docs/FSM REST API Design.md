# FSM REST API design

## WorkbookId

The workbookId is used as a session id, but it could theoretically also be used
to resume a previous session.

The set FSM set API creates a workbook if the workbookId doesn't exist yet.
All get FSM APIs expect to be given a workbookId, or they assume no workbook
has been created yet, which means there's nothing to return.

