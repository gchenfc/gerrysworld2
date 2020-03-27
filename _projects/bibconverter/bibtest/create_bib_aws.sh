cp bib_template.tex $1.tex
# note: 8 \'s: 2 for quotes, 2 for sed, 2 for $()
#                          @article{ ... ,           \cite{ ... }
for item in $(sed -n "s/^.*@\(.*\){\(.*\),.*$/\\\\\\\\cite{\2}/p" $1.bib)
do
    echo "Bibitem: $item"
    sed -i "s,citationcommandsgohere,$item citationcommandsgohere," $1.tex
done
sed -i "s,citationcommandsgohere,," $1.tex

/opt/bin/pandoc $1.tex --bibliography $1.bib -o $1.html --csl ieee.csl

ls 