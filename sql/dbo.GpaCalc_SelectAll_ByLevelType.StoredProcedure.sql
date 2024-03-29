USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[GpaCalc_SelectAll_ByLevelType]    Script Date: 12/15/2023 6:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Mark Martinez
-- Create date: 11/22/2023
-- Description: A proc to select all records corresponding to the level type id
-- Code Reviewer: Luther Adamson

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[GpaCalc_SelectAll_ByLevelType]
@LevelTypeId int 

as 

/*test code
Declare @LevelTypeId int = 3

EXECUTE dbo.GpaCalc_SelectAll_ByLevelType @LevelTypeId

*/


BEGIN


SELECT [Id]
      ,[LevelTypeId]
      ,[CourseId]
      ,[GradeTypeId]
      ,[CourseWeightTypeId]
      ,[Credits]
      ,[Semester]
	  ,CreatedById
  FROM [dbo].[GpaCalc] as gc
  WHERE gc.LevelTypeId = @LevelTypeId


END

GO
