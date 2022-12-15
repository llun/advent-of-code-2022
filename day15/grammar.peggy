Input = (line:Line nl? { return line })*

Line =
	"Sensor at x=" sx:Integer ", y=" sy:Integer ": closest beacon is at x=" bx:Integer ", y=" by:Integer
    { return { sensor: [sx, sy], beacon: [bx, by], distance: Math.abs(sx-bx)+Math.abs(sy-by), minY: sy - (Math.abs(sx-bx)+Math.abs(sy-by)), maxY: sy + (Math.abs(sx-bx)+Math.abs(sy-by)) } }

Integer "integer"
  = [-]? [0-9]+ { return parseInt(text(), 10); }

nl "newline"
  = [\n]+