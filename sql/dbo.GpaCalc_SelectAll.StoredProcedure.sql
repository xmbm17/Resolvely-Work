USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[GpaCalc_SelectAll]    Script Date: 12/15/2023 6:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Mark Martinez
-- Create date: 12/14/2023
-- Description: An select proc for all of the students years
-- Code Reviewer: Luther Adamson 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[GpaCalc_SelectAll]
@Id int


as


/*test codee -------
declare @Id int = 8

Execute dbo.GpaCalc_SelectAll @Id

*/


BEGIN 
SELECT [Id]
      ,[LevelTypeId]
      ,[CourseId]
      ,[GradeTypeId]
      ,[CourseWeightTypeId]
      ,[Credits]
      ,[Semester]
      ,[CreatedById]
  FROM [dbo].[GpaCalc]
  Where CreatedById = @Id

END


GO
