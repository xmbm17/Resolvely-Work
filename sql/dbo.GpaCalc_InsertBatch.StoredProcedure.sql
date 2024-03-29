USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[GpaCalc_InsertBatch]    Script Date: 12/15/2023 6:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Mark Martinez
-- Create date: 11/22/2023
-- Description: A proc to insert via batch insert and udt
-- Code Reviewer: Luther Adamson 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[GpaCalc_InsertBatch]
@batchSemester [dbo].[GpaInfo] READONLY


AS
/*------ test code ----




Declare @batchSem [dbo].[GpaInfo]
Insert Into @batchSem(
						LevelTypeId,
						CourseId,
						GradeTypeId,
						CourseWeightTypeId,
						Credits,
						Semester,
						CreatedById)

Values(
		4,
		7,
		3,
		2,
		2.7,
		1,
		1)

Execute dbo.GpaCalc_InsertBatch @batchSem
select * from gpacalc
*/

BEGIN

 


INSERT INTO [dbo].[GpaCalc]
           ([LevelTypeId]
           ,[CourseId]
           ,[GradeTypeId]
           ,[CourseWeightTypeId]
           ,[Credits]
           ,[Semester]
		   ,[CreatedById])

     Select b.LevelTypeId,
			b.CourseId,
			b.GradeTypeId,
			b.CourseWeightTypeId,
			b.Credits,
			b.Semester,
			b.CreatedById
	 FROM @batchSemester as b
	 Where NOT EXISTS(
						Select Id
					  FROM [dbo].[GpaCalc] as gc
					  Where  gc.CourseId = b.CourseId
							 AND gc.LevelTypeId = b.LevelTypeId
						     AND gc.CreatedById = b.CreatedById)




END
GO
