USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Modules_SelectAll_ByStudentId]    Script Date: 2/29/2024 1:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Mark Martinez
-- Create date: 01/21/2024
-- Description:	Select all modules assigned to a student via student id
-- Code Reviewer: Luis Gomez

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[Modules_SelectAll_ByStudentId]
@StudentId int

AS

-----TEST CASE----


/*
		Declare @Id int = 103

		Execute [dbo].[Modules_SelectAll_ByStudentId] @Id
*/

BEGIN


CREATE TABLE #StudentModules_Info(
Student nvarchar(500),
ModuleId int,
IsCompleted bit)

INSERT INTO #StudentModules_Info
Exec dbo.StudentModules_SelectByStudentId	@StudentId 



SELECT m.Id
      ,m.Title
      ,m.Description
      ,m.StatusTypeId
	  ,st.Name
      ,m.SortOrder
	  ,m.AutoAssign
      ,m.HasTasks
      ,m.ImageUrl
	  ,m.IsDeleted
	  ,Tasks = (SELECT 
                t.Id,
                t.ModuleId,
                t.Title,
                t.Description,
				t.Duration,
				t.ImageUrl,
				t.StatusTypeId,
				taskst.Name as StatusName,
				t.SortOrder,
                t.DateCreated,
                t.DateModified,
                    TaskType.Id as TypeId,
                    TaskType.Name
             FROM dbo.Tasks AS t inner join dbo.TaskTypes as TaskType on TaskType.Id = t.TaskTypeId
			 inner join dbo.StatusTypes as taskst on taskst.Id = t.StatusTypeId
			 WHERE t.ModuleId = si.ModuleId
             FOR JSON PATH )
      ,CreatedBy = dbo.fn_GetUserJSON(m.CreatedBy)
      ,ModifiedBy = dbo.fn_GetUserJSON(m.ModifiedBy)
      ,m.DateCreated
      ,m.DateModified
	  

           
  FROM [dbo].[Modules] as m inner join dbo.StatusTypes as st
  on m.StatusTypeId = st.Id
  inner join #StudentModules_Info as si 
  on si.ModuleId = m.Id
  WHERE m.Id = si.ModuleId
  order by m.Id desc
  DROP TABLE #StudentModules_Info
  END
GO
